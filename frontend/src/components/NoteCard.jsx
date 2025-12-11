import { Calendar, BookOpen, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note }) => {
  const date = new Date(note.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-full max-w-sm mx-4 my-4 cursor-pointer">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-6">
        {/* Header tag */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
          <Calendar className="w-3.5 h-3.5" />
          Recent Note
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {note.title}
        </h3>

        {/* Chapter & Subject */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Chapter:</span>
            <span className="text-gray-600">{note.chapter.title}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Hash className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Subject:</span>
            <span className="text-gray-600">{note.chapter.subject}</span>
          </div>
        </div>

        {/* Footer - Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-blue-600 font-medium text-sm">
            <Link to={`/notes/${note.chapter._id}/${note._id}`}>View Note →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;