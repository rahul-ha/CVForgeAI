import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1500); // loader time

    return () => clearTimeout(timer);
  }, []);

  return <PageLoader />;
}