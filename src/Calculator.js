import React from "react";
import {TouchableOpacity, View, Text} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import styled from "styled-components";
import { useState } from 'react';

const COLOR = {
    RESULT: '#4e4c51',
    RESET : '#5f5e62',
    OPERATOR : '#f39c29',
    NUM : '#5c5674',
}

// Button type : 'reset' | 'operator' | 'num'
const Button = ({text, onPress, flex, type, isSelected}) => {
    const backgroundColor = type === 'reset' ? COLOR.RESET : type === 'operator' ? COLOR.OPERATOR : type === 'num' ? COLOR.NUM : 'transparent';
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex , 
                backgroundColor , 
                justifyContent : "center", 
                alignItems : "center", 
                height : 50,
                borderWidth : isSelected ? 1 : 0.2,
                borderColor : "black",

            }}>
            <Text style={{color:"white", fontSize:25}}>{text}</Text>
        </TouchableOpacity>
    )
}

const ButtonContainer = styled.View`
    flex-direction : row;
    width: 100%;
`;
const InputContainer = styled.View`
    background-color : ${COLOR.RESULT};
    min-height : 50px;
    justify-content : center;
    align-items : flex-end;
    padding : 10px 5px;
`;

export default() => {
    const [input,setInput] = useState(0);
    const [currentOperator, setCurrentOperator] = useState(null);
    const [result, setResult] = useState(null);
    const [tempInput, setTempInput] = useState(null);
    const [tempOperator, setTempOperator] = useState(null);
    const [isClickedOperator,setIsClickedOperator] = useState(false);
    const [isClickedEqual, setIsClickedEqual] = useState(false);
    const hasInput = !!input;

    const onPressNum = (num) => {
        if(currentOperator && isClickedOperator){
            setResult(input);
            setInput(num);
            setIsClickedOperator(false);
        }else{
            const newInput = Number(`${input}${num}`)
            setInput(newInput);
        }

        
    }
    const onPressOperator = (operator) => {
        if(operator !== "="){
            setIsClickedOperator(true);
            setCurrentOperator(operator);
            setIsClickedEqual(false);
        }else{
            let finalResult = result;
            const finalInput = isClickedEqual ? tempInput : input;
            const finalOperator = isClickedEqual ? tempOperator : currentOperator;
            switch(finalOperator){
                case '+':
                    finalResult = result + finalInput;
                    break;
                case '-':
                    finalResult = result - finalInput;
                    break;
                case '*':
                    finalResult = result * finalInput;
                    break;
                case '/':
                    finalResult = result / finalInput;
                    break;
                default:
                    break;
            }
            setResult(finalResult);
            setTempInput(finalInput);
            setInput(finalResult);
            setIsClickedEqual(true);
            setCurrentOperator(null);
            setTempOperator(finalOperator);
        }
    }
    
    const onPressReset = () => {
        if(hasInput){
            setInput(0);
        }else{
            setInput(0);
            setCurrentOperator(null);
            setResult(null);
            setTempInput(null);
            setTempOperator(null);
        }
        
        
    }

    return(
        <View style={{flex:1 , width : 300, justifyContent : "center"}}>
            <Text>input : {input}</Text>
            <Text>currentOperator : {currentOperator}</Text>
            <Text>result : {result}</Text>
            <Text>tempInput : {tempInput}</Text>
            <Text>tempOperator : {tempOperator}</Text>

            <InputContainer>
                <Text style={{ color: "white", fontSize : 35, textAlign : "right"}}>{input}</Text>
            </InputContainer>

            <ButtonContainer>
                <Button
                    type="reset"
                    text={hasInput ? "C" : "AC"}
                    onPress={() => onPressReset()}
                    flex={3}
                />
                <Button
                    type="operator"
                    text="/"
                    onPress={() => onPressOperator("/")}
                    flex={1}
                    isSelected={currentOperator === "/"}
                />
            </ButtonContainer>

            <ButtonContainer>
                {[7,8,9].map((num) => (
                    <Button
                        key={`num-${num}`}
                        type="num"
                        text={`${num}`}
                        onPress={() => onPressNum(num)}
                        flex={1}
                    />
                ))}
                <Button
                    type="operator"
                    text="*"
                    onPress={() =>onPressOperator("*")}
                    flex={1}
                    isSelected={currentOperator === "*"}
                />
            </ButtonContainer>

            <ButtonContainer>
                {[4,5,6].map((num) => (
                    <Button
                        key={`num-${num}`}
                        type="num"
                        text={`${num}`}
                        onPress={() => onPressNum(num)}
                        flex={1}
                    />
                ))}
                <Button
                    type="operator"
                    text="-"
                    onPress={() => onPressOperator("-")}
                    flex={1}
                    isSelected={currentOperator === "-"}
                />
            </ButtonContainer>

            <ButtonContainer>
                {[1,2,3].map((num) => (
                    <Button
                        key={`num-${num}`}
                        type="num"
                        text={`${num}`}
                        onPress={() => onPressNum(num)}
                        flex={1}
                    />
                ))}
                <Button
                    type="operator"
                    text="+"
                    onPress={() => onPressOperator("+")}
                    flex={1}
                    isSelected={currentOperator === "+"}
                />
            </ButtonContainer>

            <ButtonContainer>
                <Button
                    type="num"
                    text="0"
                    onPress={() => onPressNum(num)}
                    flex={3}
                />
                <Button
                    type="operator"
                    text="="
                    onPress={() => onPressOperator("=")}
                    flex={1}
                />
            </ButtonContainer>
            
        </View>
    );
};