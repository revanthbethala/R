import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { courseId, lectureId } = useParams();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please upload an MP4, WebM, or OGG video.");
      return;
    }

    if (selectedFile.size > 500 * 1024 * 1024) {
      // 500MB limit
      alert("File size exceeds the 500MB limit.");
      return;
    }

    setVideo(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!courseId || !lectureId) {
      console.error("Invalid course or lecture ID");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      formData.append("isPreviewFree", isPreviewFree.toString()); // Convert to string

      if (video) {
        formData.append("file", video);
      }

      const response = await axios.put(
        `http://localhost:8000/api/v1/courses/${courseId}/lecture/${lectureId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
            setMediaProgress(true);
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const removeLectureHandler = async () => {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/courses/${courseId}/lecture/${lectureId}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(res);
  };
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={removeLectureHandler}>
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isPreviewFree}
            onCheckedChange={setIsPreviewFree}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button onClick={handleSubmit}>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
