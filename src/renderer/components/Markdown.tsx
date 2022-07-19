import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styled from "styled-components";

type TMarkdownProps = {
  children: string;
};

const Markdown = (props: TMarkdownProps) => {
  const { children } = props;

  return (
    <Container remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {children}
    </Container>
  );
};

export default Markdown;

const Container = styled(ReactMarkdown)`
  white-space: initial;
`;
