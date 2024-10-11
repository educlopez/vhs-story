// import StoryEditor from "@/components/StoryEditor";
import { HorrorStoryCreator } from "@/components/HorrorStoryCreator";

export default function Home() {
  return (
    // <main className="container mx-auto px-4 py-8">
    //   <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
    //     Visual Horror Story Generator
    //   </h1>
    //   <StoryEditor />
    // </main>
    <div className="min-h-screen bg-gray-900">
      <HorrorStoryCreator />
    </div>
  );
}
