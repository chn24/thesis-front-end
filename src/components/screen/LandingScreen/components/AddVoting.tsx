"use client";
import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from "@mui/material";
import { AbiCoder } from "ethers/abi";
import { useWriteContract } from "wagmi";
import { getVotingManagerAbi } from "@/abi/votingManagerAbi";
import { toast } from "react-toastify";
import { WriteContractErrorType } from "viem";
import { getVotingManagerContract } from "@/const/contract";
import { ContractTransactionResponse } from "ethers";

const validationSchema = yup.object({
  title: yup.string().required("Hãy nhập tiêu đề cuộc họp"),
  date: yup.date().required("Hãy chọn ngày họp"),
});

interface Props {
  handleGetData: () => Promise<void>;
}

export const AddVoting: React.FC<Props> = ({ handleGetData }) => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: "",
      date: new Date(),
    },
    onSubmit: async (values) => {
      const abi = new AbiCoder();
      const title = abi.encode(["string"], [values.title]);
      const date = (values.date.getTime() / (1000 * 86400)).toFixed();

      await handleAddVoting(title, Number(date));
    },
  });

  const handleAddVoting = async (title: string, date: number) => {
    try {
      const contract = await getVotingManagerContract();
      const tx = (await contract.createVoting(
        title,
        date
      )) as ContractTransactionResponse;
      await tx.wait();
      toast.success("Thêm cuộc bầu chọn thành công");
      await handleGetData();
    } catch (error) {
      console.log("error: ", error);
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thêm bầu cử thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
    }
  };

  return (
    <div className="p-10 bg-slate-100 shadow-lg rounded-lg">
      <p className="text-3xl font-semibold">Thêm cuộc bầu chọn</p>
      <div>
        <form
          className="mt-5 flex flex-col items-center gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-full flex justify-around ">
            <div className="w-[45%] h-[110px]">
              <p className="text-xl font-medium">Tiêu đề</p>
              <TextField
                className="w-full"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>
            <div className="w-[45%] h-[110px]">
              <p className="text-xl font-medium">Ngày họp</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  className="w-full"
                  value={formik.values.date}
                  disablePast
                  onChange={(value) => {
                    console.log(value);
                    formik.setFieldValue("date", value, true);
                  }}

                  // renderInput={(params: any) => (
                  // <TextField
                  //   error={Boolean(formik.touched.date && formik.errors.date)}
                  //   helperText={formik.touched.date && formik.errors.date}
                  //   label="Ngày họp"
                  //   margin="normal"
                  //   name="date"
                  //   variant="standard"
                  //   fullWidth
                  //   {...params}
                  //  />
                  //  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <Button className="w-max" variant="contained" type="submit">
            Thêm
          </Button>
        </form>
      </div>
    </div>
  );
};
