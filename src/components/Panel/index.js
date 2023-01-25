import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import AddNode from '../AddNode';
import { nanoid } from 'nanoid';

const Panel = ({ items, setItems }) => {
	const [showModal, setShowModal] = useState(false);
	const [defaultValues, setDefaultValues] = useState({});
	const onDragStart = (event, id) => {
		event.dataTransfer.setData('application/reactflow', id);
		event.dataTransfer.effectAllowed = 'move';
	};
	const onOpenModal = () => {
		setDefaultValues({});
		setShowModal(true);
	};
	const onCloseModal = () => {
		setShowModal(false);
		setDefaultValues({});
	};
	const saveItem = (item) => {
		if (!item.id) {
			setItems((prev) => [...prev, { ...item, id: nanoid() }]);
		} else {
			setItems((prev) =>
				prev.map((prevItem) => (item.id === prevItem.id ? item : prevItem)),
			);
		}
		setShowModal(false);
	};

	const onEditCard = (item) => {
		setDefaultValues(item);
		setShowModal(true);
	};
	return (
		<Card className="card-container w-100 h-100 p-2">
			<Button className="mb-3" onClick={onOpenModal}>
				+ Add
			</Button>
			{items.map(({ title, subTitle, type, id }) => (
				<Card
					key={id}
					className="mb-2"
					onClick={() => onEditCard({ title, subTitle, type, id })}
					onDragStart={(event) => onDragStart(event, id)}
					draggable
				>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{subTitle}</Card.Subtitle>
						<Card.Text>{type}</Card.Text>
					</Card.Body>
				</Card>
			))}
			{showModal && (
				<AddNode
					show={showModal}
					onSave={saveItem}
					onHide={onCloseModal}
					defaultValues={defaultValues}
				/>
			)}
		</Card>
	);
};

export default Panel;
