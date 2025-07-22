import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
	const { data } = await axios.get(
		"https://jsonplaceholder.typicode.com/posts"
	);
	return data;
};
export default function FeedPage() {
	// @ts-expect-error - testing;
	const { data, isLoading, isError } = useQuery("posts", fetchPosts);

	if (isLoading) return <Text textStyle={"subTitle"}>Loading...</Text>;
	if (isError) return <Text textStyle={"subTitle"}>Error fetching data</Text>;
	return (
		<div className="page">
			<Box bg="blue.300" w={"100%"} maxW={800} className="p-6 rounded-lg">
				<Text textStyle={"title"}>Feed</Text>
				<ul>
					{/* @ts-expect-error - testing */}
					{data.map((post) => (
						<li key={post.id}>
							<Text textStyle={"body"} fontSize={"lg"}>
								{post.title}
							</Text>
						</li>
					))}
				</ul>
			</Box>
		</div>
	);
}
