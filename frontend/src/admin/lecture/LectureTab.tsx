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
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Mocked data for testing
const mockLectureData = {
  lectureTitle: "Introduction to React",
  isPreviewFree: true,
  videoInfo: {
    videoUrl: "http://mockvideo.com",
    publicId: "mockid123",
  },
};

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  // Using mock data to simulate lecture retrieval
  const lecture = mockLectureData;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  // Mock function for file upload
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaProgress(true);
      try {
        // Simulating video upload
        setUploadVideoInfo({
          videoUrl: "http://mockvideo.com/uploaded",
          publicId: "mockid456",
        });
        setBtnDisable(false);
        toast.success("Video uploaded successfully");
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  // Mock function to simulate lecture update
  const editLectureHandler = async () => {
    toast.success("Lecture updated successfully");
    // Update lecture with the new title and video info
    console.log({
      lectureTitle,
      videoInfo: uploadVideInfo,
      isPreviewFree: isFree,
    });
  };

  // Mock function to simulate lecture removal
  const removeLectureHandler = async () => {
    toast.success("Lecture removed successfully");
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
          <Button
            disabled={false}
            variant="destructive"
            onClick={removeLectureHandler}
          >
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
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
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
          <Button disabled={btnDisable} onClick={editLectureHandler}>
            Update Lecture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
