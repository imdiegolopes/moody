import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2.5em;
  color: #000;
  text-align: center;
`;

export const Text = styled.p`
  font-size: 1.1em;
  text-align: left;
  color: #000;
  font-weight: bold;
`;

export const Textarea = styled.textarea`
  text-align: left;
  background: transparent;
  border: none;
  border-bottom-color: currentcolor;
  border-bottom-style: none;
  border-bottom-width: medium;
  border-bottom: 1px solid #525252;
  width: 100%;
  inset: unset;
  outline: none;
  color: #000;
`;

export const Tag = styled.span`
  display: inline-block;
  color: #000;
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 5px;
  cursor: pointer;
  background: ${(props) => (props.active ? "#ccc" : "transparent")};
  user-select: none;
`;
export const Tags = styled.div`
  display: flex;
`;

export const Header = styled.div`
  display: flex;
  place-items: center;
  text-align: center;
  justify-content: center;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const History = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 5px 5px;
  border-radius: 10px;
  margin: 5px;
  min-width: 220px;
  max-width: 220px;
`;

export const LastActivity = styled.div`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`;

export const TagColor = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;