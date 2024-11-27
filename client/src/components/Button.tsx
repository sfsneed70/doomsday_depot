interface ButtonProps {
  text: string;
  onClickFn: () => void;
}
const Button = ({ text, onClickFn }: ButtonProps) => {
  const buttonText = text || "Submit";
  const onClick = onClickFn || (() => console.log("Button clicked"));
  return <button onClick={onClick}>{buttonText}</button>;
};

export default Button;
