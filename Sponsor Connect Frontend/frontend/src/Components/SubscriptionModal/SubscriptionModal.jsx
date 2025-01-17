import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { array } from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  outline: "none",
};
const features = [
  "Prioritized ranking in communication and search",
  "Personalized suggestions",
  "Unlimited direct messages to sponsors and other users",
  "better reach",
  "Post longer videos and 1080p video uploads",
];

export default function SubscriptionModal({handleClose,open}) {

  const [plan, setPlan] = React.useState("Annually");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex item-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between bg-slate-400">
                <h1 className="text-xl pr-5">
                  Blue subscribers with a verified phone number will get a blue
                  checkmark once approved.
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJEnRacu1ORJdVZNsLVzpL1LC-p5PGRACww&s"
                  alt=""
                ></img>
              </div>
              <div className="flex justify-between border rounded-full px-5 py-3 border-gray-500">
                <div>
                  <span
                    onClick={() => setPlan("Annually")}
                    className={`${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5 ">SAVE 12%</span>
                </div>
                <p
                  onClick={() => setPlan("monthly")}
                  className={`${
                    plan === "monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer`}
                >
                  Monthly
                </p>
              </div>
              <div className="space-y-3">
                {features.map((item) => (
                  <div className="flex items-center space-x-5">
                    <FiberManualRecordIcon
                      sx={{ width: "7px", height: "7px" }}
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                <span className="line-through italic">
                ₹4900.00
                </span>
                <span className="px-5">₹3000/year</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
