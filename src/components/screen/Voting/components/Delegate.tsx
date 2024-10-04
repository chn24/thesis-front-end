import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { isAddress } from "web3-validator";
import { toast } from "react-toastify";
import { useWriteContract } from "wagmi";
import { getAccountManagerAbi } from "@/abi/accountManagerAbi";

const validationSchema = yup.object({
  address: yup.string().required("Hãy nhập địa chỉ ngừoi được uỷ quyền"),
});

export const Delegate = () => {
  const { writeContractAsync } = useWriteContract();
  const formik = useFormik({
    validationSchema,
    initialValues: {
      address: "",
    },
    onSubmit: async (values) => {
      await handleDelegate(values.address);
    },
  });

  const handleDelegate = async (address: string) => {
    try {
      const isValidAddress = isAddress(address);
      if (!isValidAddress) {
        toast.warning("Địa chỉ không hợp lệ");
        return;
      }
      await writeContractAsync({
        abi: getAccountManagerAbi(),
        // @ts-ignore
        address: process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS,
        functionName: "delegate",
        args: [address],
      });
      toast.success("Uỷ quyền thành công");
    } catch (error) {
      // @ts-ignore
      if (Object.keys(error).includes("cause")) {
        // @ts-ignore
        toast.error(
          `Uỷ quyền thất bại: ${
            // @ts-ignore
            error.cause.details ? error.cause.details : error.cause.reason
          }`
        );
      } else {
        toast.error("Uỷ quyền thất bại");
      }
    }
  };

  return (
    <div className="p-10 bg-slate-100 shadow-lg rounded-lg">
      <p className="text-3xl font-semibold">Uỷ quyền</p>
      <form
        className="mt-5 flex flex-col items-center gap-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-3/4 flex flex-col gap-3 h-[120px]">
          <p className="text-xl font-semibold">Địa chỉ</p>
          <TextField
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            placeholder="0x555BdfdBC34D551884AAca9225f92F7c7F7c3f45"
          />
        </div>
        <Button variant="contained" type="submit">
          Xác nhận
        </Button>
      </form>
    </div>
  );
};
