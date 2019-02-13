import React, { Component } from "react";

class Toolbox extends Component {

  insertCode(param) {
    this.props.clickSvg(param)
  }

  render() {
    return (
      <div>
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => {this.insertCode("NewParticipant")}}
        >
          <title>New participant</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Participant-Copy" stroke="#bbbfd3">
              <rect
                id="Rectangle"
                x="8.5"
                y="4.5"
                width="34"
                height="10"
                rx="3"
              />
              <path
                d="M25.5,15 L25.5,47.5"
                id="Line"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
            </g>
          </g>
        </svg>

        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => {this.insertCode("A->B:message")}}
        >
          <title>Async message</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Message-Copy">
              <path
                d="M40.5,5 L40.5,47"
                id="Line"
                stroke="#bbbfd3"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
              <path
                d="M11.6315789,20 L37,20"
                id="Line-2"
                stroke="#bbbfd3"
                stroke-width="2"
                stroke-linecap="square"
              />
              <path
                d="M31.9736842,13.7258398 L37.5869926,25.0263158 L26.3603759,25.0263158 L31.9736842,13.7258398 Z"
                id="Triangle"
                stroke="#bbbfd3"
                stroke-width="2"
                transform="translate(31.973684, 20.000000) rotate(90.000000) translate(-31.973684, -20.000000) "
              />
              <path
                d="M9.5,5 L9.5,47"
                id="Line"
                stroke="#bbbfd3"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
              <rect
                id="Rectangle"
                fill="#bbbfd3"
                x="25"
                y="13"
                width="3"
                height="6"
              />
              <rect
                id="Rectangle"
                fill="#bbbfd3"
                x="25"
                y="21"
                width="3"
                height="6"
              />
            </g>
          </g>
        </svg>
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => {this.insertCode("A.message {\n}")}}
        >
          <title>Sync message</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Execution-Copy" stroke="#bbbfd3">
              <path
                d="M40.5,5 L40.5,47"
                id="Line"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
              <rect
                id="Rectangle"
                fill="#bbbfd3"
                x="37.5"
                y="20.5"
                width="6"
                height="13"
              />
              <path
                d="M11.6315789,20 L34.3684211,20"
                id="Line-2"
                stroke-width="2"
                stroke-linecap="square"
              />
              <polygon
                id="Triangle"
                stroke-width="2"
                fill="#bbbfd3"
                transform="translate(32.473684, 20.000000) rotate(90.000000) translate(-32.473684, -20.000000) "
                points="32.4736842 15.4736842 36.4736842 24.5263158 28.4736842 24.5263158"
              />
              <path
                d="M9.5,5 L9.5,47"
                id="Line"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
            </g>
          </g>
        </svg>
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = { () => {this.insertCode("result = A.message {\n}")}}
        >
          <title>Return value</title>
          <g
            id="Execution-Copy-4"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              d="M40.5,5 L40.5,47"
              id="Line"
              stroke="#bbbfd3"
              stroke-linecap="square"
              stroke-dasharray="5"
            />
            <rect
              id="Rectangle"
              stroke="#bbbfd3"
              fill="#bbbfd3"
              x="37.5"
              y="20.5"
              width="6"
              height="13"
            />
            <path
              d="M11.6315789,20 L34.3684211,20"
              id="Line-2"
              stroke="#bbbfd3"
              stroke-width="2"
              stroke-linecap="square"
            />
            <polygon
              id="Triangle"
              stroke="#bbbfd3"
              stroke-width="2"
              fill="#bbbfd3"
              transform="translate(32.473684, 20.000000) rotate(90.000000) translate(-32.473684, -20.000000) "
              points="32.4736842 15.4736842 36.4736842 24.5263158 28.4736842 24.5263158"
            />
            <path
              d="M9.5,5 L9.5,47"
              id="Line"
              stroke="#bbbfd3"
              stroke-linecap="square"
              stroke-dasharray="5"
            />
            <path
              d="M36.5,34 L17.0526316,34"
              id="Line"
              stroke="#bbbfd3"
              stroke-width="2"
              stroke-linecap="square"
              stroke-dasharray="3"
            />
            <path
              d="M11.5,34 L18,34"
              id="Line-2-Copy"
              stroke="#bbbfd3"
              stroke-width="2"
              stroke-linecap="square"
              transform="translate(15.000000, 34.000000) rotate(-180.000000) translate(-15.000000, -34.000000) "
            />
            <g
              id="Group-Copy"
              transform="translate(19.500000, 34.000000) rotate(-180.000000) translate(-19.500000, -34.000000) translate(14.000000, 27.000000)"
            >
              <path
                d="M6.97368421,0.725839752 L12.5869926,12.0263158 L1.36037585,12.0263158 L6.97368421,0.725839752 Z"
                id="Triangle"
                stroke="#bbbfd3"
                stroke-width="2"
                transform="translate(6.973684, 7.000000) rotate(90.000000) translate(-6.973684, -7.000000) "
              />
              <path
                d="M6.97368421,0.725839752 L12.5869926,12.0263158 L1.36037585,12.0263158 L6.97368421,0.725839752 Z"
                id="Triangle-Copy"
                stroke="#bbbfd3"
                stroke-width="2"
                transform="translate(6.973684, 7.000000) rotate(90.000000) translate(-6.973684, -7.000000) "
              />
              <rect
                id="Rectangle"
                fill="#bbbfd3"
                x="0"
                y="0"
                width="3"
                height="6"
              />
              <rect
                id="Rectangle"
                fill="#bbbfd3"
                x="0"
                y="8"
                width="3"
                height="6"
              />
            </g>
          </g>
        </svg>
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = { () => {this.insertCode("A.message() {\n  selfMessage()\n}")}}
        >
          <title>Self message</title>
          <g
            id="Execution-Copy-2"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              d="M20.5,4 L20.5,46"
              id="Line"
              stroke="#bbbfd3"
              stroke-linecap="square"
              stroke-dasharray="5"
            />
            <rect
              id="Rectangle"
              stroke="#bbbfd3"
              fill="#bbbfd3"
              x="17.5"
              y="24.5"
              width="6"
              height="13"
            />
            <g
              id="Group-2"
              transform="translate(20.000000, 12.000000)"
              stroke="#bbbfd3"
              stroke-width="2"
            >
              <g id="Group">
                <path d="M1,1 L23,1" id="Line-2" stroke-linecap="square" />
                <path
                  d="M17.0526316,12.5 L22.5,12.5"
                  id="Line-2"
                  stroke-linecap="square"
                />
                <path d="M23,12 L23,1" id="Line-2" stroke-linecap="square" />
                <polygon
                  id="Triangle"
                  fill="#bbbfd3"
                  transform="translate(10.526316, 12.000000) rotate(270.000000) translate(-10.526316, -12.000000) "
                  points="10.5263158 7.47368421 14.5263158 16.5263158 6.52631579 16.5263158"
                />
              </g>
            </g>
          </g>
        </svg>

        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => {this.insertCode("a = new A()")}}
        >
          <title>New instance</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Creation-Copy">
              <path
                d="M40.5,32 L40.5,49"
                id="Line"
                stroke="#bbbfd3"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
              <path
                d="M11.6315789,26 L29,26"
                id="Line-2"
                stroke="#bbbfd3"
                stroke-width="2"
                fill="#bbbfd3"
                stroke-linecap="square"
              />
              <polygon
                id="Triangle"
                stroke="#bbbfd3"
                stroke-width="2"
                fill="#bbbfd3"
                transform="translate(28.526316, 26.000000) rotate(90.000000) translate(-28.526316, -26.000000) "
                points="28.5263158 21.4736842 32.5263158 30.5263158 24.5263158 30.5263158"
              />
              <path
                d="M9.5,5 L9.5,47"
                id="Line"
                stroke="#bbbfd3"
                stroke-linecap="square"
                stroke-dasharray="5"
              />
              <rect
                id="Rectangle"
                stroke="#bbbfd3"
                x="35.5"
                y="20.5"
                width="10"
                height="10"
                rx="3"
              />
              <text
                id="C"
                font-family="LucidaConsole, Lucida Console"
                font-size="18"
                font-weight="normal"
                fill="#bbbfd3"
              >
                <tspan x="11.6315789" y="24">
                  C
                </tspan>
              </text>
            </g>
          </g>
        </svg>

        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => {this.insertCode("if(condition) {\n  A.method()\n}")}}
        >
          <title>Conditional</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Alt-Copy">
              <rect
                id="Rectangle"
                stroke="#bbbfd3"
                x="4.5"
                y="8.5"
                width="31"
                height="35"
              />
              <path
                d="M5.57147686,20.9013672 L22,21"
                id="Line-3"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
              <text
                id="Alt"
                font-family="Arial-Black, Arial Black"
                font-size="14"
                font-weight="700"
                fill="#bbbfd3"
              >
                <tspan x="14" y="37">
                  Alt
                </tspan>
              </text>
              <path
                d="M25.5,15.2006836 L22.1101562,20.9013672"
                id="Line-3"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
              <path
                d="M25.5,15.2006836 L25.5,9"
                id="Line-4"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
            </g>
          </g>
        </svg>

        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => this.insertCode("while(condition) {\n  A.method()\n}")}
        >
          <title>Loop</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Loop-Copy">
              <rect
                id="Rectangle"
                stroke="#bbbfd3"
                x="4.5"
                y="8.5"
                width="41"
                height="35"
              />
              <path
                d="M5.57147686,20.9013672 L22,21"
                id="Line-3"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
              <text
                id="Loop"
                font-family="Arial-Black, Arial Black"
                font-size="14"
                font-weight="700"
                fill="#bbbfd3"
              >
                <tspan x="6" y="37">
                  Loop
                </tspan>
              </text>
              <path
                d="M25.5,15.2006836 L22.1101562,20.9013672"
                id="Line-3"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
              <path
                d="M25.5,15.2006836 L25.5,9"
                id="Line-4"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
            </g>
          </g>
        </svg>

        <svg
          width="40px"
          height="40px"
          viewBox="0 0 50 50"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick = {() => {this.insertCode("//Note\nA.message()")}}
        >
          <title>Note</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Note-Copy">
              <path
                d="M7.625,15 L2.375,30.5"
                id="Line"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
              <path
                d="M10.625,15 L5,31"
                id="Line"
                stroke="#bbbfd3"
                stroke-linecap="square"
              />
              <text
                id="Note"
                font-family="Arial-ItalicMT, Arial"
                font-size="18"
                font-style="italic"
                font-weight="normal"
                fill="#bbbfd3"
              >
                <tspan x="9" y="30">
                  Note
                </tspan>
              </text>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
export default Toolbox;
