import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

export function SEO({ form }) {
    const [keyword, setKeyword] = useState('')
  
    const addKeyword = () => {
      if (keyword.trim()) {
        const currentKeywords = form.getValues('keywords') || []
        form.setValue('keywords', [...currentKeywords, keyword.trim()])
        setKeyword('')
      }
    }
  
    const removeKeyword = (index) => {
      const currentKeywords = form.getValues('keywords') || []
      form.setValue('keywords', currentKeywords.filter((_, i) => i !== index))
    }
  
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter meta title" {...field} />
              </FormControl>
              <FormDescription>
                Optimal length: 50-60 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter meta description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optimal length: 150-160 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input
                      placeholder="Enter a keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="button" onClick={addKeyword} className="w-full sm:w-auto">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {field.value?.map((kw, index) => (
                      <Badge key={index} variant="secondary">
                        {kw}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-auto p-0 text-muted-foreground"
                          onClick={() => removeKeyword(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Add relevant keywords for your product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }
  
  SEO.propTypes = {
    form: PropTypes.shape({
      control: PropTypes.object.isRequired,
      getValues: PropTypes.func.isRequired,
      setValue: PropTypes.func.isRequired,
    }).isRequired,
  }
  
  
