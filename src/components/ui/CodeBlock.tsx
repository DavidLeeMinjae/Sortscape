import { CopyBlock, dracula } from "react-code-blocks";

interface codeBlockProps {
  code: string,
  language?: string,
  showLineNumbers?: boolean,
}

const CodeBlock: React.FC<codeBlockProps> = ({code, language = "javascript", showLineNumbers = true }) => {
  return (
    <CopyBlock
      wrapLongLines={true}
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      theme={dracula}
    />
  )
}


export default CodeBlock;