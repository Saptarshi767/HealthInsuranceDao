import React, { useState } from "react";

// Import the AppContext and AppProviderProps
import { AppContext } from "./appContext";

// Create the provider component
const AppProvider = ({ children }) => {
	// Define your initial state here if needed
	// const [data, setData] = useState<SomeDataType>(initialData);

	// You can add functions and state management logic here

	return (
		<AppContext.Provider
			value={
				{
					// Add your state variables and functions here
					// data,
					// setData,
				}
			}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
