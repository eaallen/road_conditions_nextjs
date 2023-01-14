import { forwardRef, LegacyRef, ReactNode } from "react";

interface Props {
  children?: ReactNode
  href?:string
  onClick?:  React.MouseEventHandler<HTMLAnchorElement>
}
type Ref = HTMLAnchorElement;

const Linkable = forwardRef<Ref, Props>(({children, href, onClick} : Props, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    {children}
  </a>
));

export default Linkable

