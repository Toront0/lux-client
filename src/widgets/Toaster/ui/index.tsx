import { MessageToast } from "@/entities";
import { useToaster } from "@/stores";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Toaster = () => {
  const toasts = useToaster();

  return (
    <div className="fixed top-14 right-6 space-y-4 z-40">
      <TransitionGroup className="space-y-4">
        {toasts.toasts.map((v) => (
          <CSSTransition
            classNames="my-toast"
            timeout={200}
            key={v.id}
            nodeRef={v.ref}
          >
            <div>
              <MessageToast
                ref={v.ref}
                id={v.id}
                key={v.id}
                type="message"
                img={v.img}
                subtitle={v.subtitle}
                title={v.title}
              />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Toaster;
