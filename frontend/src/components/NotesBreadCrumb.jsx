import { Link } from "react-router-dom";


function getChapterInfo(data, chapterId) {
  for (const subject of data) {
    const chapter = subject.chapters.find(ch => ch._id === chapterId);
    if (chapter) {
      return {
        subjectName: subject._id,
        chapterTitle: chapter.title
      };
    }
  }
  return null;
}


const NotesBreadCrumb = ({ data, chapterId }) => {
  const info = getChapterInfo(data, chapterId);

  if (!info) return <div>Recent</div>;

  return (
    <div style={{ fontSize: "14px", color: "#555" }}>
      Notes / <Link to={`/notes/${chapterId}`}>{info.subjectName}</Link> / {info.chapterTitle}
    </div>
  );
};

export default NotesBreadCrumb;
