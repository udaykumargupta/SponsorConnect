import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
  outline: "none",
};

const features = [
  "Prioritized ranking in communication and search",
  "Personalized suggestions",
  "Unlimited direct messages to sponsors and other users",
  "Better reach",
  "Post longer videos and 1080p video uploads",
];

export default function SubscriptionModal({ handleClose, open }) {
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
          <div className="flex justify-end">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="text-center space-y-6">
            <div className="bg-blue-100 p-5 rounded-md flex items-center justify-between">
              <p className="text-xl font-medium text-gray-800">
              Premium members are 2.6x more likely to get Sponsors on average.
              </p>
              <img
                className="w-14 h-14"
                src="https://media.licdn.com/dms/image/v2/C4D0BAQF0iTIdJ2jiCw/company-logo_200_200/company-logo_200_200/0/1630555083881/sponsor_connect1_logo?e=2147483647&v=beta&t=dRReOIWqhECaTwTbDz69oN02zYOZh8L7ObTLkiL1Heo"
                alt="checkmark"
              />
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
            <div className="space-y-4 text-left">
              <p>Claim your 1-month free trial today. Cancel anytime. We’ll send you a reminder 7 days before your trial ends.</p>
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-700 text-sm space-x-3"
                >
                  <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="bg-gray-900 text-white text-sm rounded-full px-5 py-3 inline-block cursor-pointer">
                <span className="line-through italic mr-4">₹4900.00</span>
                <span className="font-semibold">₹3000/year</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
