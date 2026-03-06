import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import { useSelector } from 'react-redux'
import { Colors } from '../../constants/appConstants'
import c from '../../styles'
import { darkMode } from '../../redux/Selectors/setting'

type DropdownProps = {
    title?: string
    mandatoryField?: any
    data: any[]
    value: any
    onSelect: (index: number, value: any) => void
    error?: string
    containerStyle?: any
    errorStyle?: any
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
    labelField?: string
    valueField?: string
    isActive?: 1 | 0
}


export default function Dropdown({
    title,
    mandatoryField = 0,
    data,
    value,
    onSelect,
    error,
    containerStyle,
    errorStyle,
    placeholder = 'Select',
    size = 'lg',
    labelField = 'value',
    valueField = 'value',
    isActive = 0,
}: DropdownProps) {
    const emptyOption = {
        [labelField]: placeholder,
        [valueField]: '',
    }
    const themes = useSelector(darkMode) as boolean

    const SIZE = {
        sm: { height: 30, font: 12, padding: 8 },
        md: { height: 40, font: 14, padding: 10 },
        lg: { height: 48, font: 15, padding: 12 },
    }[size]

    const filteredData =
        isActive === 1
            ? data?.filter(item => item.is_active === 1)
            : data

    const dropdownData = [emptyOption, ...(filteredData || [])]

    const selectedItem = dropdownData?.find(
        item => item[valueField] === value
    )

    useEffect(() => {
        if (
            value !== '' &&
            isActive === 1 &&
            !filteredData?.some(item => item[valueField] === value)
        ) {
            onSelect(0, '')
        }
    }, [isActive, filteredData, value])

    return (
        <View style={[styles.container, containerStyle]}>
            {title ? (
                <Text style={[c.textMedium(themes), { fontSize: 14, fontWeight: 'bold' }]}>
                    {title}
                    {mandatoryField ? (
                        <Text style={{ color: 'red' }}> *</Text>
                    ) : null}
                </Text>
            ) : null}


            <ModalDropdown
                options={dropdownData}
                onSelect={(index, item) =>
                    onSelect(index, item[valueField]) // "" for Select
                }
                renderButtonText={(item) => item[labelField]}
                renderRow={(item) => (
                    <Text
                        key={`${item[valueField]}-${item[labelField]}`}
                        style={[
                            styles.dropdownText(themes),
                            { fontSize: SIZE.font },
                        ]}
                    >
                        {item[labelField]}
                    </Text>
                )}
                dropdownStyle={styles.dropdown(themes)}
            >
                <View
                    style={[
                        styles.inputStyle(themes),
                        {
                            height: SIZE.height,
                            paddingHorizontal: SIZE.padding,
                            borderColor: error
                                ? Colors.red
                                : value && !themes
                                    ? Colors.black
                                    : Colors.border,
                        },
                    ]}
                >
                    <Text
                        style={{
                            fontSize: SIZE.font,
                            color:
                                selectedItem && selectedItem[valueField] !== ''
                                    ? themes
                                        ? Colors.white
                                        : Colors.black
                                    : '#8A9199',
                        }}
                    >
                        {selectedItem
                            ? selectedItem[labelField]
                            : placeholder}
                    </Text>
                </View>
            </ModalDropdown>

            {error ? <Text style={[c.errorStyle, errorStyle]}>{error}</Text> : null}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
        width: '100%',
        marginBottom: 8,
    },

    inputStyle: (theme: boolean) => ({
        borderRadius: 8,
        borderWidth: theme ? 0 : 1,
        backgroundColor: theme ? '#2B303A' : Colors.white,
        marginTop: 9,
        justifyContent: 'center',
        width: '100%',
    }),

    dropdown: (theme: boolean) => ({
        width: '80%',
        backgroundColor: theme ? '#2B303A' : Colors.white,
        borderRadius: 8,
    }),

    dropdownText: (theme: boolean) => ({
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: theme ? Colors.white : Colors.black,
    }),
})