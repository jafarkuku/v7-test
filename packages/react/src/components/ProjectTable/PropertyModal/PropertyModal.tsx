import { Property } from "@v7-product-interview-task/api";

import { Modal } from "@/components/ui/Modal/Modal";

import { PropertyActions } from "./PropertyActions/PropertyActions";
import { PropertyTypePicker } from "./PropertyTypePicker/PropertyTypePicker";

/**
 * Modal for creating or editing a Property in two steps.
 */

type PropertyModalProps = {
  open: boolean;
  property?: Property;
  onCreateProperty: (property: Property) => void;
  onClose: () => void;
};

export const PropertyModal: React.FC<PropertyModalProps> = ({
  open,
  property,
  onCreateProperty,
  onClose,
}) => (
  <Modal testId="property-modal" open={open} onClose={onClose} ariaLabel="Property settings">
    <div className="w-100">
      {!property ? (
        <PropertyTypePicker onCreateProperty={onCreateProperty} onError={onClose} />
      ) : (
        <PropertyActions property={property} onCloseModal={onClose} />
      )}
    </div>
  </Modal>
);
