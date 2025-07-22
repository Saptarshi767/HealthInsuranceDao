import { extendTheme } from "@chakra-ui/react";

const customColors = {
	blue: {
		100: "#003559",
		200: "#285678",
		300: "#0D74AD",
		400: "#FFFFFF",
	},
};

const config = {
	initialColorMode: "light", // Set your initial color mode here
};

const theme = extendTheme({
	config,
	colors: {
		...customColors,
	},
	fonts: {
		body: "Arial, sans-serif",
		heading: "Helvetica, sans-serif",
	},
	textStyles: {
		h1: {
			// you can also use responsive styles
			fontSize: ["48px", "72px"],
			fontWeight: "bold",
			lineHeight: "110%",
			letterSpacing: "-2%",
		},
		h2: {
			color: "white", 
			fontSize: "7px", // Adjust font size as needed
			fontWeight: "semiBold", // Adjust font weight as needed
			marginBottom: "0.5rem", // Add some bottom margin for spacing
		},
		base: {
			fontFamily: "body",
			color: "gray.100",
		},
		textSecondary: {
			color: "gray.300",
		},
		link: {
			color: "gray.200",
			_hover: {
				textDecoration: "underline",
			},
		},
		title: {
			fontSize: "44px",
			fontFamily: "heading",
			color: "gray.100",
			fontWeight: "bold",
		},
		subTitle: {
			fontSize: "28px",
			fontFamily: "heading",
			color: "white",
		},
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: "bold",
			},
			variants: {
				primary: {
					bg: "blue.300",
					color: "white",
					borderColor: "white",
					border: "2px",
					_hover: {
						border: "4px",
					},
				},
				secondary: {
					bg: "blue.500",
					color: "white",
					fontSize: "l",
					width: "100%",
					_hover: {
						bg: "blue.600",
					},
				},
			},
		},
		Input: {
			variants: {
				outline: {
					field: {
						borderColor: "green.200",
					},
				},
			},
		},
		Box: {
			baseStyle: {
				borderRadius: "md",
				padding: 9,
			},
		},
	},
	styles: {
		global: {
			body: {
				bg: "gray.800",
			},
		},
	},
});

export default theme;
