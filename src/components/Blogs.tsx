import React, { useState, useEffect } from "react";

type Blog = {
  id: number;
  title: string;
  content: string;
};

const tokenStorageKey = "blog-api-token";

export default function Blogs() {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let token = localStorage.getItem(tokenStorageKey);
      if (!token) {
        // Token not found, re-authenticate and get a new token
        token = await reAuthenticateAndGetToken();
        if (typeof token === "string") {
          localStorage.setItem(tokenStorageKey, token);
        } else {
          throw new Error("Failed to obtain a valid token");
        }
      }

      fetch("https://blogtest.courierplus-ng.site/api/blogs", {
        headers: {
          token: "Bearer ${token}",
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || "An error occurred");
            });
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API request failed:", error.message);
          setError(error.message);
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  const reAuthenticateAndGetToken = async (): Promise<string | null> => {
    const response = await fetch(
      "https://blogtest.courierplus-ng.site/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "tester@email.com",
          password: "password",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to authenticate");
    }

    const data = await response.json();
    return data.token || null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((blog) => (
          <div key={blog.id}>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src="blog.image_url" alt="blog-logo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.content}</p>
                <div className="card-actions justify-end">
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No blogs found.</div>
      )}
    </div>
  );
}
