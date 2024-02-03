import React, { useState } from 'react';

const DrawerComponent = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Button to toggle the drawer */}
      <div className="text-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          Show swipeable drawer
        </button>
      </div>

      {/* Drawer component */}
      {isDrawerOpen && (
        <div className="fixed z-40 w-full h-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-800 transition-transform bottom-0 left-0 right-0 translate-y-0 bottom-[60px]">
          <div className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
            <span className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
            <h5 className="inline-flex items-center text-base text-gray-500 dark:text-gray-400 font-medium">
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
              </svg>
              Add widget
            </h5>
          </div>
          {/* Rest of the drawer content */}
          <div className="grid grid-cols-3 gap-4 p-4 lg:grid-cols-4">
            {/* ... (rest of the HTML code) */}
          </div>
        </div>
      )}
    </>
  );
};

export default DrawerComponent;
