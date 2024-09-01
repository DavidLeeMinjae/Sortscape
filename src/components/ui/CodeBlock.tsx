import { CopyBlock, dracula } from "react-code-blocks";

interface codeBlockProps {
  code: string,
  language?: string,
  showLineNumbers?: boolean
}

const CodeBlock: React.FC<codeBlockProps> = ({ code, language = "javascript", showLineNumbers = true }) => {
  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      theme={dracula}
      wrapLongLines={true}
    />
  )
}

export default CodeBlock