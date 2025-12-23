import React, { useState } from "react";
import axios from "axios";
import "../static/RequestForm.css";
import Loader from "./Loader1.jsx";

const RequestForm = () => {
  const [url, setUrl]  = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState("application/json");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [viewMode, setViewMode] = useState("json");

  const handleRequest = async () =>{
    try{
      setIsLoading(true);
      setApiResponse(""); 
      setStatusCode(null);  // old response clear

      const payload = {
        method:method,
        url:url,
        body: body,
        headers: {
          "Content-Type": contentType
        }
      };

      const response = await axios.post("http://localhost:8080/api/tester/send", payload)
      console.log("Response:", response);
      setApiResponse(response.data);
      setStatusCode(response.status);
    }
    catch(error){
      if(error.response.status === 500){
        setApiResponse({error: "Internal Server Error at the server."});
        setStatusCode(error.response.status || 500);
      }else{
        setApiResponse(error.response.data || {error: "An error occurred."});
        setStatusCode(error.response.status);
      }
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="main-wrapper">

      <div className="request-box">
        <h2 className="heading">API Request</h2>

        <label>Enter API Endpoint:</label>
        <input  
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text" placeholder="https://api.example.com/endpoint" />

        <label>Select Method:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <label>Request Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter JSON Body here..."></textarea>

        <label>Content-Type:</label>
        <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
          <option>application/json</option>
          <option>application/id+json</option>
          <option>text/plain</option>
          <option>text/html</option>
        </select>

        <button onClick={handleRequest} className="send-btn" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Request"}
        </button>
      </div>
      
      <div className="response-box">
        <h3 className={(statusCode == 200 ? "green" : "red")}>{statusCode == 200 ? "Ok:" : "Status Code:"} {statusCode}</h3>
        <button className={viewMode === "json" ? "active" : ""} onClick={()=> setViewMode("json")}>JSON</button>
        <button className={viewMode === "raw" ? "active" : ""} onClick={()=> setViewMode("raw")}>RAW</button>
        <h2 className="heading">Response</h2>

        <div className="response-body">
          {isLoading ? (
            <Loader/>
          ) : apiResponse ? (
            viewMode === "json" ? (
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            ) : (
              <pre>{typeof apiResponse === "string" ? apiResponse : JSON.stringify(apiResponse)}</pre>
            )
          ) : (
            <p>No response yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default RequestForm;
