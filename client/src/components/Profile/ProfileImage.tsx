import React from "react";
/*
https://imranbappy.me/_ipx/w_640,q_75/%2F_next%2Fstatic%2Fmedia%2Fimran-hosen.51750c04.png?url=%2F_next%2Fstatic%2Fmedia%2Fimran-hosen.51750c04.png&w=640&q=75
*/
const ProfileImage = (props: any) => {
  return (
    <div>
      <div className="flex items-center justify-center   ">
        <label
          style={
            props.url && {
              backgroundImage: `url(${props.url})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }
          }
          htmlFor="thumbnail"
          className="flex flex-col items-center justify-center w-72 h-72 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {props.url && (
            <p
              style={{ background: "rgb(0 0 0 / 56%)" }}
              className=" mt-40 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          )}

          {!props.url && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <>
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            </div>
          )}
          <input
            onChange={(e: any) => props.setImage(e.target.files[0])}
            name="thumbnail"
            id="thumbnail"
            type="file"
            className=" opacity-0"
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImage;
