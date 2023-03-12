import { useForm } from "react-hook-form";
import { api } from "../../utils/api";

interface CommentBoxProps {
  line: number;
  breaks: number[];
  setBreaks: (breaks: number[]) => void;
}

interface CommentForm {
  body: string;
}

export const CommentBox = ({ line, breaks, setBreaks }: CommentBoxProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>();

  const { mutate: createComment } = api.comment.create.useMutation({
    onError: () => console.log("error"),
    onSuccess: () => console.log("success"),
  });

  const onSubmit = (data: CommentForm) => {
    console.log(data);
    createComment({ documentId: "999", body: data.body });
  };

  return (
    <div className="flex w-full items-center bg-gray-900 p-2 ">
      <div className="flex h-48 w-[800px] max-w-4xl flex-col rounded border border-gray-500 bg-gray-800 p-4 text-white">
        <form method="post" onSubmit={void handleSubmit(onSubmit)}>
          <textarea
            {...register("body", { required: true })}
            placeholder="Leave a comment"
            className="mb-4 h-3/4 w-full rounded border border-gray-500 bg-gray-900 p-2"
          />
          {errors.body && <span>This field is required</span>}

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
            <button type="submit" className="rounded bg-green-500 p-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
