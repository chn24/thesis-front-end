"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, IconButton, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userStore } from "@/store/userStore";

type LoginInfo = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Hãy nhập đúng định dạng !")
    .required("Hãy nhập email!"),
  password: yup.string().required("Hãy nhập mật khẩu"),
});

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setUser = userStore((state) => state.setUser);

  const handleClickShowPass = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loginInfo: LoginInfo = {
        email: values.email,
        password: values.password,
      };

      await handleLogin(loginInfo);
    },
  });

  const handleLogin = async (loginInfo: LoginInfo) => {
    setLoading(true);
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 400) {
            toast.error("Sai mật khẩu");
          } else if (res.status === 404) {
            toast.error("Email không đúng");
          } else {
            toast.error("Đăng nhập thất bại");
          }
          return false;
        }
      })
      .then((data: any) => {
        if (data) {
          setUser(data.user);
          router.push("/");
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đăng nhâpj thất bại");
        setLoading(false);
      });
  };

  return (
    <div className="w-[700px] mx-auto border-[1px] rounded-xl border-[#1976d2] px-10 py-6">
      <form className=" flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          <p className="text-xl font-semibold">Email</p>
          <TextField
            className="w-[600px]"
            variant="standard"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="w-full">
          <p className="text-xl font-semibold">Mật khẩu</p>
          <div className="flex">
            <TextField
              className="w-[600px]"
              variant="standard"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <IconButton onClick={handleClickShowPass}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        <Button variant="contained" className="w-max mx-auto" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};
