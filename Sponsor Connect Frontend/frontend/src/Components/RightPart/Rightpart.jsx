import React from "react";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

const Rightpart = () => {
  const [openSubscriptionModel, setOpenSubscriptionModel] =
    React.useState(false);
  const handleOpenSubscriptionModel = () => setOpenSubscriptionModel(true);
  const handleCloseSubscriptionModel = () => setOpenSubscriptionModel(false);

  return (
    <div className="hideScrollBar py-1 sticky top-0 left-0 w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Get Verified Section */}
      <section className="my-5 p-6 border border-gray-800 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <h1 className="text-2xl font-semibold text-grey-900">       Get Verified</h1>
        <h2 className="font-medium my-2 text-gray-600">
          Unlock your full potential with SponsorConnect Premium
        </h2>

        <Button
          // variant="contained"
          sx={{
            padding: "12px",
            paddingX: "24px",
            borderRadius: "30px",
            color: "blue",
            bgcolor: "white",
            border: "2px solid #1E88E5", 
            "&:hover": {
              borderColor:"green", 
              color: "green-700", 
            },
          }}
          
          onClick={handleOpenSubscriptionModel}
        >
          Try for free!
        </Button>
      </section>

      {/* Top Sponsors / Trending Section */}
      <section className="mt-7 space-y-5 p-4">
        <h1 className="font-semibold text-2xl text-left text-gray-800">
          Trending Now
        </h1>

        <div>
          <p className="text-sm text-left text-gray-600">
            TaTa is sponsoring chess player
          </p>
          <p className="font-semibold text-left text-gray-800">
            Pragg got sponsor from Adani Group
          </p>
        </div>

        {[1, 1, 1].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full text-left border-b border-gray-200 py-4"
          >
            <div>
              <p className="text-sm text-gray-500">Entertainment . Trending</p>
              <p className="font-semibold text-gray-800">#Hotstar</p>
              <p className="text-gray-500">34.3K RePosts</p>
            </div>
            <MoreHorizIcon className="text-gray-600 hover:text-blue-500 transition-all duration-300 cursor-pointer" />
          </div>
        ))}
      </section>

      {/* Subscription Modal */}
      <section>
        <SubscriptionModal
          open={openSubscriptionModel}
          handleClose={handleCloseSubscriptionModel}
        />
      </section>
    </div>
  );
};

export default Rightpart;
