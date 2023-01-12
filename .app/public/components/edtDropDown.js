import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { defaultCSS } from "../stylesheets/_default/components";

const EdtDropDown = ({ data, value, onSelect = () => {} }) => {
  //console.log("selected value: ", !!value);
  const [showOptions, setShowOptions] = useState(false);


  return (
    <View style={defaultCSS.container}>
      <TouchableOpacity 
                style={defaultCSS.edtdropdown}
                activeOpacity={0.5}
                onPress={() => setShowOptions(!showOptions)} 
        >
        <Text>{!!value ? value?.title : "test"}</Text>
        <Ionicons name="chevron-down-outline" size={24} color="black" />
      </TouchableOpacity>
      {showOptions && (<View>
        {data.map((val, i) => {
          return <Text key={String(i)}>{val.title}</Text>;
        })}
      </View>)}
    </View>
  );
};

export default EdtDropDown;
