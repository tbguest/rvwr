interface CommentBoxProps {
  line: number;
  breaks: number[];
  setBreaks: (breaks: number[]) => void;
}

export const CommentBox = ({ line, breaks, setBreaks }: CommentBoxProps) => {
  return (
    <div className="flex w-full items-center bg-gray-900 p-2 ">
      <div className="flex h-48 w-[800px] max-w-4xl flex-col rounded border border-gray-500 bg-gray-800 p-4 text-white">
        <textarea
          placeholder="Leave a comment"
          className="mb-4 h-3/4 w-full rounded border border-gray-500 bg-gray-900 p-2"
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              const newArr = [...breaks];
              const index = newArr.indexOf(line);
              console.log("index", index);
              if (index > -1) {
                newArr.splice(index, 1);
              }
              setBreaks(newArr);
            }}
            className="rounded bg-gray-600 p-2"
          >
            Cancel
          </button>
          <button className="rounded bg-green-500 p-2">Save</button>
        </div>
      </div>
    </div>
  );
};
