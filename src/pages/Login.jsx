import { useState } from "react";

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // 1. Get Auth Code from Hylid SDK
      const res = await window.my.getAuthCode({
        scopes: ['auth_base', 'USER_ID']
      });

      if (res && res.authCode) {
        // 2. Send to Backend
        const response = await fetch("https://its.mouamle.space/api/auth-with-superQi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: res.authCode }),
        });

        if (response.ok) {
          const userData = await response.json();
          // 3. Success
          onLogin(userData);
          window.my.alert({ title: "نجاح", content: "تم تسجيل الدخول بنجاح" });
        } else {
          console.log("Backend error:", response.status);
        }
      } else {
        console.log("Failed to get auth code or cancelled");
      }
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>مرحباً بك في تطبيق QI</h1>
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {loading ? "جاري التحقق..." : "تسجيل الدخول عبر QI"}
      </button>
    </div>
  );
}

export default Login;
