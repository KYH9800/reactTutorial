import React, { memo } from "react";

const Record = memo(({ idx, val }) => {
  return (
    <>
      <li>
        {idx + 1}. {val} ms
      </li>
    </>
  );
});

export default Record;
