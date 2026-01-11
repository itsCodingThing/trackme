import { useState } from "react";
import { motion } from "motion/react";

const sheetParent = {
	expanded: {
		height: "70vh",
	},
	collapsed: {
		height: "auto",
	},
};

const sheetChild = {
	expanded: {
		opacity: 1,
		height: "auto",
	},
	collapsed: {
		opacity: 0,
		height: 0,
		display: "none",
	},
};

export default function SwipeBottomSheet() {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<motion.div
			className="pb-20 absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-2xl z-10"
			variants={sheetParent}
			animate={isExpanded ? "expanded" : "collapsed"}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={0.2}
			onDragEnd={(_, info) => {
				const { offset, velocity } = info;

				if (Math.abs(velocity.y) > 500) {
					// Fast swipe
					if (velocity.y > 0) {
						setIsExpanded(false); // Swipe down - collapse
					} else {
						setIsExpanded(true); // Swipe up - expand
					}
				} else {
					// Based on drag distance
					if (offset.y > 50) {
						setIsExpanded(false); // Dragged down - collapse
					} else if (offset.y < -50) {
						setIsExpanded(true); // Dragged up - expand
					}
				}
			}}
		>
			{/* Drag Handle */}
			<div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
				<div className="h-1.5 w-12 rounded-full bg-muted" />
			</div>

			{/* Content */}
			<div className="p-4 space-y-4 overflow-y-auto">
				{/* Main Stats - Always Visible */}
				<div className="flex justify-between"></div>

				{/* Detailed Stats - Animated */}
				<motion.div
					variants={sheetChild}
					animate={isExpanded ? "expanded" : "collapsed"}
					className="space-y-4 pt-4 border-t border-muted overflow-hidden"
				>
					<div className="grid grid-cols-2 gap-4"></div>

					{/* Action Buttons */}
					<div className="flex gap-3 pt-4"></div>
				</motion.div>
			</div>
		</motion.div>
	);
}
