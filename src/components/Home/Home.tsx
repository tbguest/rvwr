import { type NextPage } from "next";
import { useState } from "react";
import { CommentBox } from "~/components/CommentBox";
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

const Home: NextPage = () => {
  const [data, setData] = useState<string | ArrayBuffer | null | undefined>();
  const [breaks, setBreaks] = useState<number[]>([]);
  const showFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setData(text);
    };
    if (e.target.files) {
      reader.readAsText(e.target.files[0] as Blob);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">REVWR</span>
        </h1>
      </div>
      <input type="file" onChange={(e) => void showFile(e)} />
      <br />
      <br />
      <div className="mb-8 max-w-screen-2xl overflow-auto rounded border-2 border-gray-500">
        <div className="bg-gray-800 p-2 text-gray-300">filename.tsx</div>
        {data && (
          <Highlight {...defaultProps} code={data as string} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <>
                    {breaks.includes(i) && (
                      <CommentBox
                        line={i}
                        breaks={breaks}
                        setBreaks={setBreaks}
                      />
                    )}
                    <div
                      key={i}
                      {...getLineProps({ line, key: i })}
                      className="table-row overflow-x-auto bg-inherit"
                    >
                      <span className="table-cell w-12 select-none overflow-x-auto bg-green-600 pr-4 text-right text-white opacity-50">
                        {i + 1}
                      </span>
                      <span> </span>
                      <button
                        onClick={() => {
                          setBreaks([...breaks, i + 1]);
                        }}
                        className="table-cell"
                      >
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </button>
                    </div>
                  </>
                ))}
              </pre>
            )}
          </Highlight>
        )}
      </div>
    </main>
  );
};

export default Home;
