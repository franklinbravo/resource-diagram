import React from 'react';
import { Handle } from 'reactflow';
import { BsBox } from 'react-icons/bs';
import { Card } from 'react-bootstrap';

const ElementNode = ({ data, isConnectable }) => {
	return (
		<>
			<Handle type="target" position="top" isConnectable={isConnectable} />
			<Card className="custom-node">
				<Card.Body>
					{data.label} <BsBox />
				</Card.Body>
			</Card>
			<Handle
				type="source"
				position="bottom"
				id="b"
				isConnectable={isConnectable}
			/>
		</>
	);
};

export default ElementNode;
