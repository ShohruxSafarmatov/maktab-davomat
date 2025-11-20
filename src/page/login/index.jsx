import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../utils/toast";
import { PostLogin } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        PostLogin({
          username: email,
          password: password,
        })
      );

      if (response?.error) {
        const errorData = response.payload;
        const errorMsg = errorData?.non_field_errors?.[0];
        toastError(errorMsg);
      } else {
        toastSuccess("Tizimga muvaffaqiyatli kirdingiz");
        navigate("/dashboard");
      }
    } catch (error) {
      toastError("Server xatoligi");
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div style={{ marginBottom: 20 }}>
        <label>Login</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: "8px 12px",
            marginTop: 5,
          }}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Login kiritng"
            required
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Parol</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: "8px 12px",
            marginTop: 5,
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolni kiriting"
            required
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 14,
            }}
          />
          <span
            role="img"
            aria-label="toggle visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </span>
        </div>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          height: "47px",
          padding: "10px",
          backgroundColor: "#4d68f5",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {loading ? <span className="loader"></span> : "Kirish"}
      </button>
    </form>
  );
};

export default Login;
