import { useMemo, useState } from 'react';
import { usePrevious } from 'shared/hooks/usePrevious';
import { Modal as AntModal } from 'antd';

type Props = {
  title?: string;
  open?: boolean;
  width?: number;
  disabledHeader?: boolean;
  disableCloseButton?: boolean;
  component?: (props: Props, close: () => void) => any;
  destroyOnClose?: boolean;
  closeOnEsc?: boolean;
  centered?: boolean;
  zIndex?: number;
};
export const useModal = (modalProps: Props) => {
  const {
    disableCloseButton = true,
    open: openProps,
    width,
    component,
    closeOnEsc,
    title,
    centered = false,
    zIndex,
  } = modalProps;

  const [open, setOpen] = useState<boolean>(openProps ?? false);
  const prevOpen = usePrevious(open);

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);
  const toggleModal = () => setOpen((open) => !open);

  return useMemo(
    () => ({
      open: () => handleOpenModal(),
      close: () => handleOpenModal(),
      toggle: () => toggleModal(),
      shouldReload: !prevOpen && open,
      isOpen: open,
      modalRef: (
        <AntModal
          {...modalProps}
          closable={!disableCloseButton}
          keyboard={closeOnEsc}
          centered={centered}
          title={title}
          visible={open}
          onCancel={handleCloseModal}
          width={width}
          zIndex={zIndex}
          footer={null}
        >
          {component && component(modalProps, () => handleCloseModal())}
        </AntModal>
      ),
    }),
    [open, prevOpen, component, modalProps, title, disableCloseButton, closeOnEsc, centered, width, zIndex],
  );
};
