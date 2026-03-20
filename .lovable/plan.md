

## Salud Plus — Login Screen

### Layout
Split-screen design (responsive: stacks on mobile):

**Left Panel (50%)**
- Dark navy background (#0F172A) with subtle medical-themed decorative elements (CSS shapes/gradients simulating a medical environment with blue overlay)
- Logo (uploaded image) centered at top
- Title: "Gestiona tu salud de forma rápida y segura" in white, large font
- Short subtitle text explaining the platform benefits
- Decorative heartbeat line animation (CSS)

**Right Panel (50%)**
- Light background (#F8FAFC)
- Centered login card with shadow
- "Bienvenido" heading
- Large input field: "Número de cédula" with person icon, proper sizing for easy tap
- Primary button "Acceder" in amber/orange (#F59E0B) — full width, rounded
- Loading spinner state on button when submitting
- Inline error messages (red text below input for invalid/empty cédula)
- Links below: "¿No tienes cuenta? Regístrate", "Registro de dependientes"
- Footer text: "Salud Plus © 2026"

### Pages & Components
- **LoginPage** — main split layout page
- **LoginForm** — card with input, button, links, error/loading states

### Micro UX Details
- Input validation: shows error if cédula is empty or invalid format on submit
- Button shows spinner + "Accediendo..." text during loading state (simulated)
- Smooth transitions on error appearance
- Mobile: left panel collapses to a compact header with logo + title, form takes full width

### Design Tokens
- Update CSS variables: primary to navy (#0F172A), accent to amber (#F59E0B)
- Font: clean sans-serif (Inter via system stack)
- Border radius: 12px on card, 8px on inputs/buttons

### Files to create/modify
- Copy logo to `src/assets/`
- Create `src/pages/LoginPage.tsx`
- Create `src/components/LoginForm.tsx`
- Update `src/pages/Index.tsx` to render LoginPage
- Update `src/index.css` with brand colors

