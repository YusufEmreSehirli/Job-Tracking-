import React from "react";

const Error = ({ msg, retry }) => {
  return (
    <div className="error">
      <p>Üzgünüz verilere erişirken bir sorun oluştu.</p>
      <p className="text">{msg}</p>

      <button onClick={retry} class="btn">
        Tekrar Dene{" "}
      </button>
    </div>
  );
};

export default Error;
