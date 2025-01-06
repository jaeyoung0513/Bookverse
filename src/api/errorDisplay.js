import React from "react";

export default function errorDisplay(error) {
  const logError = (error) => {
    // 에러 로깅 예제
    console.error("Logged Error:", error);
    // Sentry 또는 다른 로깅 시스템으로 전송
    // Sentry.captureException(error);
  };

  logError(error);

  // 사용자 친화적 메시지
  let userMessage = "An unexpected error occurred. Please try again later.";

  if (error.code === "ECONNABORTED") {
    userMessage =
      "The request took too long. Please check your network connection and try again.";
    console.error("Timeout Error:", error.message);
  } else if (error.response) {
    userMessage =
      error.response.data?.message ||
      "An error occurred while processing your request.";
    console.error("Response Error Data:", error.response.data);
    console.error("Response Error Status:", error.response.status);
  } else if (error.request) {
    userMessage =
      "The request was made but no response was received. Please check your network.";
    console.error("Request Error:", error.request);
  } else {
    console.error("General Error:", error.message);
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderRadius: "5px",
      }}
    >
      <h1>Error</h1>
      <p>{userMessage}</p>
      {process.env.NODE_ENV === "development" && (
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
}
