import React from 'react';
import { Handle } from 'reactflow';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import { Card } from 'react-bootstrap';

const PageNode = ({ data, isConnectable }) => {
	return (
		<>
			<Handle type="target" position="top" isConnectable={isConnectable} />
			<Card className="custom-node">
				<Card.Body>
					{data.label} <BsLayoutSidebarInset />
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

export default PageNode;
