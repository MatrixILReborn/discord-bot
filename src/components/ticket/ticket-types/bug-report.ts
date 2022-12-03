import { ButtonStyle, ComponentType, TextInputStyle } from 'discord.js';
import { createTicketType } from '../utils/ticket-type';

export default createTicketType(
    {
        type: ComponentType.Button,
        custom_id: 'create_bug_report',
        style: ButtonStyle.Primary,
        emoji: {
            name: '🐛',
        },
        label: 'Bug Report',
    },
    {
        custom_id: 'create_bug_report',
        title: 'Create a Bug Report',
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        custom_id: 'repro',
                        label: 'What did you do to make this bug happen?',
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Paragraph,
                        placeholder: [
                            '1. Use ...',
                            '2. Do ...',
                            '3. See error',
                        ].join('\n'),
                        required: true,
                        max_length: 1000,
                    },
                ],
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        custom_id: 'expected',
                        label: 'What did you expect to happen?',
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Paragraph,
                        required: true,
                        max_length: 1000,
                    },
                ],
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        custom_id: 'actual',
                        label: 'What actually happened?',
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Paragraph,
                        required: true,
                        max_length: 1000,
                    },
                ],
            },
        ],
    }
);
