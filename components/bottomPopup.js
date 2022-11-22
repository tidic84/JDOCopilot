// import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList } from 'react-native';
// import React, { useState } from 'react';

// const height = Dimensions.get('window').height;

// export default class bottomPopup extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             show: false
//         }
//     }

//     show = () => {
//         this.setState({ show: true })
//     }

//     close = () => {
//         this.setState({ show: false })
//     }

//     renderOutsideTouchable(onTouch) {
//         const view = <View style={{ flex: 1, width: '100%' }} />
//         if (!onTouch) return view

//         return (
//             <TouchableWithoutFeedback onPress={onTouch} style={{ flex: 1, width: '100%' }}>
//                 {view}
//             </TouchableWithoutFeedback>
//         )
//     }

//     renderTitle = () => {
//         const { title } = this.props
//         return (
//             <View style={{ alignItems: 'center' }}>
//                 <Text style={{
//                     color: '#182E44',
//                     fontSize: 20,
//                     fontWeight: '500',
//                     marginTop: 15,
//                     marginBottom: 30
//                 }}>
//                     {title}
//                 </Text>
//             </View>
//         )
//     }

//     renderContent = () => {
//         const { data } = this.props
//         return (
//             <View>
//                 <FlatList
//                     style={{ marginBottom: 20 }}
//                     showsVerticalScrollIndicator={false}
//                     data={data}
//                     renderItem={this.renderItem}
//                     extraData={data}
//                     keyExtractor={(item, index) => index.toString()}
//                     ItemSeparatorComponent={this.renderSeparator}
//                     contentContainerStyle={{ paddingBottom: 40 }}
//                 />
//             </View>
//         )
//     }

//     renderItem = ({ item }) => {
//         return (
//             <View style={{ height: 50, flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 50 }}>
//                 <Text style={{ fontSize: 18, fontWeight: 'normal', color: '#182E44' }}>{item.name}</Text>
//             </View>
//         )
//     }

//     renderSeparator = () => {
//         return (
//             <View style={{ opacity: 0.1, backgroundColor: '#182E44', height: 1 }} />
//         )
//     }

//     render() {
//         let { show } = this.state
//         const { onTouchOutside } = this.props

//         return (
//             <Modal
//                 animationType={"fade"}
//                 transparent={true}
//                 visible={show}
//                 onRequestClose={this.close}
//             >

//                 <View style={{
//                     flex: 1,
//                     backgroundColor: "#000000AA",
//                     justifyContent: 'flex-end'
//                 }}
//                 >
//                     {this.renderOutsideTouchable(onTouchOutside)}
//                     <View style={{
//                         backgroundColor: "#FFFFFF",
//                         width: '100%',
//                         borderTopRightRadius: 10,
//                         borderTopLeftRadius: 10,
//                         paddingHorizontal: 10,
//                         maxHeight: height * 0.4
//                     }}>
//                         {this.renderTitle()}
//                         {this.renderContent()}
//                     </View>

//                 </View>


//             </Modal>
//         )
//     }
// }