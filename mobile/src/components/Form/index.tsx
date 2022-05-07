import React, { useState } from 'react'
import { ArrowLeft } from 'phosphor-react-native'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system' 
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

import { styles } from './styles'
import { Button } from '../Button'
import { theme } from '../../theme'
import { FeedbackType } from '../Widget'
import { ScreenshotButton } from '../ScreenshotButton'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { api } from '../../services/api'

interface Props {
  feedbackType: FeedbackType
  onFeedbackSent: () => void
  onFeedbackCanceled: () => void
}

export function Form({ feedbackType, onFeedbackSent, onFeedbackCanceled }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleScreenshot() {
    const imageUri = await captureScreen({
      format: 'jpg',
      quality: 0.8
    })

    setScreenshot(imageUri)
  }

  function handleScreenshotRemove() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) return
    setIsSendingFeedback(true)

    const screenshotBase64 = screenshot 
      ? await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })
      : null

    try {
      await api.post('/feedbacks', {
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        type: feedbackType,
      })

      onFeedbackSent()
    } catch (error) {
      console.log(error)
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            { feedbackTypeInfo.title }
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        autoCorrect={false}
        style={styles.input}
        placeholder="Descreva com detalhes oque está acontecendo...."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />
      
      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreenshot} 
          onRemoveShot={handleScreenshotRemove} 
          screenshot={screenshot} 
        />

        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}