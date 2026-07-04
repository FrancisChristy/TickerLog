import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

type ActiveScreen = 'Deposit' | 'Stock' | 'Crypto' | 'Forex' | 'Commodities';

const Add = () => {
  // const [market, setMarket] = useState('');
  // const [instrument, setInstrument] = useState('');
  // const [type, setType] = useState('');
  // const [entryDateTime, setEntryDateTime] = useState('');
  // const [ticker, setTicker] = useState('');
  // const [buyPrice, setBuyPrice] = useState('');
  // const [buyQuantity, setBuyQuantity] = useState('');
  // const [exitDateTime, setExitDateTime] = useState('');
  // const [sellPrice, setSellPrice] = useState('');
  // const [sellQuantity, setSellQuantity] = useState('');
  // const [leverage, setLeverage] = useState('');
  // const [charges, setCharges] = useState('');
  // const [profitLoss, setProfitLoss] = useState('');
  // const [strategy, setStrategy] = useState('');
  // const [entryCondition, setEntryCondition] = useState('');
  // const [exitCondition, setExitCondition] = useState('');
  // const [notes, setNotes] = useState('');

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('Stock');

  // --- FORM STATES ---
  const [depositForm, setDepositForm] = useState({
    depositType: 'Fixed', // Default dropdown value
    amount: '',
    bankName: '',
    referenceId: '',
    notes: '',
  });

  const [tradeForm, setTradeForm] = useState({
    market: '',
    instrument: '',
    type: '',
    entryDateTime: '',
    ticker: '',
    buyPrice: '',
    buyQuantity: '',
    exitDateTime: '',
    sellPrice: '',
    sellQuantity: '',
    leverage: '',
    charges: '',
    profitLoss: '',
    strategy: '',
    entryCondition: '',
    exitCondition: '',
    notes: '',
    emotionalState: '',
  });

  const updateDepositField = (key: string, value: string) => {
    setDepositForm((prev) => ({ ...prev, [key]: value }));
  };


  const updateTradeField = (key: string, value: string) => {
    setTradeForm((prev) => ({ ...prev, [key]: value }));
  };


  // --- SUB-COMPONENTS ---
  // Navigation Bar Component 
  const renderNavBar = () => {
    const buttons: ActiveScreen[] = ['Deposit', 'Stock', 'Crypto', 'Forex', 'Commodities'];
    return (
      <View style={styles.navWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.navScroll} contentContainerStyle={styles.navScrollContent}>
          {buttons.map((btn) => {
            const isActive = activeScreen === btn;
            return (
              <TouchableOpacity
                key={btn}
                style={[styles.navButton, isActive && styles.navButtonActive]}
                onPress={() => setActiveScreen(btn)}
              >
                <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
                  {btn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };   

  // 2. Helper to render side-by-side input fields
  const renderTradeRow = (
    label1: string,
    key1: string,
    placeholder1: string,
    isNum1 = false,
    label2: string,
    key2: string,
    placeholder2: string,
    isNum2 = false,
  ) => (
    <View style={styles.row}>
      <View style={styles.halfColumn}>
        <Text style={styles.label}>{label1}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder1}
          keyboardType={isNum1 ? 'numeric' : 'default'}
          value={(tradeForm as any)[key1]}
          onChangeText={text => updateTradeField(key1, text)}
        />
      </View>
      <View style={styles.halfColumn}>
        <Text style={styles.label}>{label2}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder2}
          keyboardType={isNum2 ? 'numeric' : 'default'}
          value={(tradeForm as any)[key2]}
          onChangeText={text => updateTradeField(key2, text)}
        />
      </View>
    </View>
  );

  // Screen 1: Dedicated Deposit Form
  const renderDepositScreen = () => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>New Deposit Entry</Text>
      
      {/* Native Picker Dropdown */}
      <Text style={styles.label}>Deposit Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={depositForm.depositType}
          onValueChange={(itemValue) => updateDepositField('depositType', itemValue)}
          style={styles.picker}
          dropdownIconColor="#4a5568"
        >
          <Picker.Item label="Fixed Deposit" value="Fixed" />
          <Picker.Item label="Recurring Deposit" value="Recurring" />
        </Picker>
      </View>

      <Text style={styles.label}>Deposit Amount ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#a0aec0"
        keyboardType="numeric"
        value={depositForm.amount}
        onChangeText={(text) => updateDepositField('amount', text)}
      />

      <Text style={styles.label}>Institution / Bank Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Chase, Binance Wallet"
        placeholderTextColor="#a0aec0"
        value={depositForm.bankName}
        onChangeText={(text) => updateDepositField('bankName', text)}
      />

      <Text style={styles.label}>Transaction Reference ID</Text>
      <TextInput
        style={styles.input}
        placeholder="TXN123456789"
        placeholderTextColor="#a0aec0"
        value={depositForm.referenceId}
        onChangeText={(text) => updateDepositField('referenceId', text)}
      />

      <Text style={styles.label}>Deposit Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add context or funding source info..."
        placeholderTextColor="#a0aec0"
        multiline={true}
        numberOfLines={3}
        value={depositForm.notes}
        onChangeText={(text) => updateDepositField('notes', text)}
      />

      <TouchableOpacity style={[styles.submitButton]}>
        <Text style={styles.submitText}>Log {depositForm.depositType} Deposit</Text>
      </TouchableOpacity>
    </ScrollView>
  );  

  // Screen 2: Universal 20-Input Trade Journal Form
  const renderTradeScreen = (market: string) => (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{market} Journal Entry</Text>
      {renderTradeRow(
        'Buy Price',
        'buyPrice',
        'e.g., 100.00',
        true,
        'Quantity',
        'buyQuantity',
        'e.g., 100',
        true
      )}
      {renderTradeRow(
        'Sell Price',
        'sellPrice',
        'e.g., 110.00',
        true,
        'Quantity',
        'sellQuantity',
        'e.g., 100',
        true
      )}

      <Text style={styles.label}>Mindset Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Calm, anxious, FOMO, disciplined..."
        placeholderTextColor="#a0aec0"
        value={tradeForm.emotionalState}
        onChangeText={(text) => updateTradeField('emotionalState', text)}
      />

      <Text style={styles.label}>Deep Context Strategy Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Why did you map this trade setup? Include mistakes..."
        placeholderTextColor="#a0aec0"
        multiline={true}
        numberOfLines={4}
        value={tradeForm.notes}
        onChangeText={(text) => updateTradeField('notes', text)}
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Save {market} Log Entry</Text>
      </TouchableOpacity>
    </ScrollView>
  );     
  
  return (
    <SafeAreaProvider style={styles.container}>
      {/* 1. Static Category Switcher Navigation */}
      {renderNavBar()}

      {/* 2. Keyboard Lifting Container Layer */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* 3. Conditional Screen Routing Engine */}
        {activeScreen === 'Deposit' ? renderDepositScreen() : renderTradeScreen(activeScreen)}
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}  

  // return (
  //   <SafeAreaProvider style={styles.container}>
  //     <View style={styles.centeredContent}>
  //       <Text style={styles.screenTitle}>New Journal</Text>
  //     </View>
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === 'android' ? 'padding' : 'height'}
  //       style={styles.keyboardAvoidingView}
  //       keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 20}
  //     >
  //       <ScrollView
  //         style={styles.scrollView}
  //         contentContainerStyle={styles.scrollContent}
  //         keyboardShouldPersistTaps="handled"
  //         showsVerticalScrollIndicator={true}
  //       >


  //         <Text style={styles.label}>Trade Notes</Text>
  //         <TextInput
  //           style={[styles.input, styles.textArea]}
  //           placeholder="Enter market context and lessons learned..."
  //           multiline={true}
  //           numberOfLines={4}
  //           value={tradeForm.notes}
  //           onChangeText={text => updateTradeField('notes', text)}
  //         />
  //       </ScrollView>
  //     </KeyboardAvoidingView>
  //   </SafeAreaProvider>
  // );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 70 : 0,
    backgroundColor: '#000000',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  name: {
    color: 'white',
    fontSize: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfColumn: {
    width: '48%', // Leaves a 4% gap down the center
  },  
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#2d3748',
  },  
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60, // Critical: gives scrolling headroom above the keyboard
  },  
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },  
  navWrapper: {
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 10,
  },
  navScroll: {
    paddingHorizontal: 10,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#edf2f7',
    marginHorizontal: 5,
  },
  navButtonActive: {
    backgroundColor: '#10b981',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5568',
  },
  navButtonTextActive: {
    color: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#10b981',
  },  
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 6,  
    marginBottom: 15,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'android' ? 56 : 150,
    color: '#2d3748',
    paddingBottom: 10
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navScrollContent: {
    paddingLeft: 10,   // Match your original spacing on the left
    paddingRight: 30,  // 👈 Adds clean breathing room after the 'Commodities' button
  },
});

export default Add;
