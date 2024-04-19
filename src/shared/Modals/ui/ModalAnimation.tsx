import { CSSTransition } from "react-transition-group";

interface IModalPortal {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const ModalPortal = ({ children, isOpen }: IModalPortal) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames="my-modal"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default ModalPortal;
