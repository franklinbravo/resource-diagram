import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddNode = ({ show, onHide, onSave, defaultValues = {} }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	return (
		<Modal
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onHide}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit(onSave)}>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control
							isInvalid={!!errors?.title}
							{...register('title', {
								required: { value: true, message: 'Is required' },
							})}
						/>
						{errors?.title && (
							<Form.Control.Feedback type="invalid">
								{errors.title.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Sub-Title</Form.Label>
						<Form.Control
							isInvalid={!!errors?.subTitle}
							{...register('subTitle', {
								required: { value: true, message: 'Is required' },
							})}
						/>
						{errors?.subTitle && (
							<Form.Control.Feedback type="invalid">
								{errors.subTitle.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" variant="outline">
						Save
					</Button>
					<Button onClick={onHide}>Close</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default AddNode;
