import React from 'react';
import { Stage, Layer, Rect, Text } from "react-konva";

class GameVisualOP extends React.Component {
	componentDidMount() {
		this.checkSize();
		window.addEventListener("resize", this.checkSize);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.checkSize);
	}
	checkSize = () => {
		const canvasContainerHeight = document.getElementById("game-controller-container").offsetHeight + 2;
		const canvasContainerWidth = document.getElementById("game-controller-container").offsetWidth;
		this.setState({
			stageWidth: canvasContainerWidth,
			stageHeight: canvasContainerHeight,
		});
	}
	render() {
		return (
			<>
				<Stage
					width={this.props.dimensions.canvas.width}
					height={this.props.dimensions.canvas.height}
				>
					<Layer>
						<Rect
							x={0}
							y={0}
							fill={this.props.colors.backdrop}
							width={this.props.dimensions.canvas.width}
							height={this.props.dimensions.canvas.height}
						/>
					</Layer>
					<Layer>
						{this.props.keyYPositions.white.map((notePosY, id) =>
							<Rect
								key={id}
								x={-5}
								y={notePosY}
								width={this.props.dimensions.blackKey.width}
								height={this.props.dimensions.blackKey.height}
								fill={this.props.colors.blackKey.base}
							/>
						)}
						{this.props.keyYPositions.black.map((notePosY, id) =>
							<Rect
								key={id}
								x={-5}
								y={notePosY}
								width={this.props.dimensions.whiteKey.width}
								height={this.props.dimensions.whiteKey.height}
								fill={this.props.colors.whiteKey.base}
								cornerRadius={5}
								shadowBlur={5}
							/>
						)}
					</Layer>
					<Layer>
						{this.props.noteSchedule.notes.map((scheduledNote, id) =>
							<Text
								key={id}
								text={scheduledNote}
								x={250}
								y={scheduledNote.y}
								cornerRadius={3}
								shadowBlur={5}
							/>
						)}
					</Layer>
				</Stage>
			</>
		);
	}
}

export default GameVisualOP;