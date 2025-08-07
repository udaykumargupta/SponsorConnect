import React from "react";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";

// 1. Accept `theme` as a prop to control the component's appearance.
const Rightpart = ({ theme }) => {
  const [openSubscriptionModel, setOpenSubscriptionModel] =
    React.useState(false);
  const handleOpenSubscriptionModel = () => setOpenSubscriptionModel(true);
  const handleCloseSubscriptionModel = () => setOpenSubscriptionModel(false);

  return (
    // 2. Apply theme-aware classes to the main container for background color.
    <div className="hideScrollBar py-1 sticky top-0 left-0 w-full bg-white dark:bg-[#15202b] shadow-md rounded-lg overflow-hidden transition-colors duration-300">
      {/* Get Verified Section */}
      {/* 3. Update the card's background, border, and text colors. */}
      <section className="my-5 p-6 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1e2732] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Get Verified</h1>
        <h2 className="font-medium my-2 text-gray-600 dark:text-gray-300">
          Unlock your full potential with SponsorConnect Premium
        </h2>

        {/* 4. Update the Material-UI Button's style for dark mode using the `sx` prop. */}
        <Button
          sx={{
            padding: "12px",
            paddingX: "24px",
            borderRadius: "30px",
            color: theme === 'dark' ? 'white' : '#1E88E5',
            bgcolor: 'transparent', 
            border: "2px solid #1E88E5",
            "&:hover": {
              borderColor: "green",
              color: "green",
            },
          }}
          onClick={handleOpenSubscriptionModel}
        >
          Try for free!
        </Button>
      </section>

      {/* Top Sponsors / Trending Section */}
      <section className="mt-7 space-y-5 p-4">
        <h1 className="font-semibold text-2xl text-left text-gray-800 dark:text-white">
          Trending Now
        </h1>

        {/* 5. Update all text and border colors in the trending list. */}
        <div>
          <p className="text-sm text-left text-gray-600 dark:text-gray-400">
            TaTa is sponsoring chess player
          </p>
          <p className="font-semibold text-left text-gray-800 dark:text-gray-200">
            Pragg got sponsor from Adani Group
          </p>
        </div>

        {[1, 1, 1].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full text-left border-b border-gray-200 dark:border-gray-700 py-4"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Entertainment . Trending</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">#Hotstar</p>
              <p className="text-gray-500 dark:text-gray-400">34.3K RePosts</p>
            </div>
            <MoreHorizIcon className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all duration-300 cursor-pointer" />
          </div>
        ))}
      </section>

      {/* Subscription Modal */}
      <section>
        {/* 6. Pass the theme prop down to the modal if it also needs to be themed. */}
        <SubscriptionModal
          open={openSubscriptionModel}
          handleClose={handleCloseSubscriptionModel}
          theme={theme}
        />
      </section>
    </div>
  );
};

export default Rightpart;
